import {mount} from "enzyme";
import {API_URL} from "../FxRatesProvider/api";
import Comp from ".";

describe("App integration", () => {
    const render = () => mount(<Comp />);

    it("Render wallets", () => {
        const comp = render();
        const wallets = comp.find('[data-test="wallet"]');
        const withdrawWallet = wallets.first();
        const transferWallet = wallets.last();

        expect(withdrawWallet.find('[data-test="wallet-currency"]').first().text()).toEqual("GBP");
        expect(withdrawWallet.find('[data-test="wallet-funds"]').first().text()).toEqual("£50.00");

        expect(transferWallet.find('[data-test="wallet-currency"]').first().text()).toEqual("USD");
        expect(transferWallet.find('[data-test="wallet-funds"]').first().text()).toEqual("$50.00");
    });

    {
        const assertCurrChange = (comp, currs, btnSel, walletsSel) => {
            currs.forEach((curr) => {
                comp.find(btnSel)
                    .first()
                    .simulate("click");

                comp.update();

                const wallets = comp.find(walletsSel);

                expect(wallets.first().props().currency).toEqual(curr);
            });
        };

        it("Set withdraw wallet currency", () => {
            const comp = render();

            assertCurrChange(
                comp,
                ["USD", "EUR", "GBP"],
                '[data-test="withdraw-wallets"] [data-test="next-button"]',
                '[data-test="withdraw-wallets"] [data-test="wallet"]',
            );

            assertCurrChange(
                comp,
                ["EUR", "USD", "GBP"],
                '[data-test="withdraw-wallets"] [data-test="back-button"]',
                '[data-test="withdraw-wallets"] [data-test="wallet"]',
            );
        });

        it("Set transfer wallet currency", () => {
            const comp = render();

            assertCurrChange(
                comp,
                ["EUR", "GBP", "USD"],
                '[data-test="transfer-wallets"] [data-test="next-button"]',
                '[data-test="transfer-wallets"] [data-test="wallet"]',
            );

            assertCurrChange(
                comp,
                ["GBP", "EUR", "USD"],
                '[data-test="transfer-wallets"] [data-test="back-button"]',
                '[data-test="transfer-wallets"] [data-test="wallet"]',
            );
        });
    }

    it("Set and sync inputs ", async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => ({
                base: "GBP",
                rates: {USD: 0.5},
            }),
        }));

        const comp = render();

        await new Promise(setImmediate);

        Object.entries({
            "20.00": "10.00",
            "31.50": "15.75",
            "50.00": "25.00",
        }).forEach(([withdrawVal, transferVal]) => {
            const withdrawInput = comp.find('[data-test="wallet"]').first()
                .find('[data-test="input"]').first();

            withdrawInput.find("input").simulate("change", {
                target: {value: withdrawVal},
            });

            const transferInput = comp.find('[data-test="wallet"]').last()
                .find('[data-test="input"]').first();

            expect(transferInput.props().value).toEqual(transferVal);
        });

        Object.entries({
            "10.00": "20.00",
            15.75: "31.50",
            "25.00": "50.00",
        }).forEach(([transferVal, withdrawVal]) => {
            const transferInput = comp.find('[data-test="wallet"]').last()
                .find('[data-test="input"]').first();

            transferInput.find("input").simulate("change", {
                target: {value: transferVal},
            });

            const withdrawInput = comp.find('[data-test="wallet"]').first()
                .find('[data-test="input"]').first();

            expect(withdrawInput.props().value).toEqual(withdrawVal);
        });

        global.fetch.mockClear();
    });

    it("Show exchange rate", async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => ({
                base: "GBP",
                rates: {USD: 0.5},
            }),
        }));

        const comp = render();

        await new Promise(setImmediate);

        comp.update();

        expect(comp.find('[data-test="src-currency"]').text()).toEqual("£1.00");
        expect(comp.find('[data-test="dst-currency"]').text()).toEqual("$0.50");

        global.fetch.mockClear();
    });

    describe("Get rates", () => {
        const assertRatesUrl = (base) => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${API_URL}/latest?base=${base}`,
            );
        };

        beforeEach(() => {
            jest.spyOn(global, "fetch");
        });

        afterEach(() => {
            global.fetch.mockClear();
        });

        it("Get rates upon mount", async () => {
            render();
            await new Promise(setImmediate);

            expect(global.fetch).toHaveBeenCalledTimes(1);
            assertRatesUrl("GBP");
        });

        it("Set rates polling every 10 sec", async () => {
            jest.useFakeTimers();

            render();
            await new Promise(setImmediate);

            [0, 10000, 10000].forEach((interval, i) => {
                jest.advanceTimersByTime(interval);
                expect(global.fetch).toHaveBeenCalledTimes(i + 1);
                assertRatesUrl("GBP");
            });
        });

        it("Get rates upon currency change", async () => {
            const comp = render();

            await new Promise(setImmediate);

            ["USD", "EUR", "GBP"].forEach((curr, i) => {
                comp.find('[data-test="withdraw-wallets"] [data-test="next-button"]')
                    .first()
                    .simulate("click");

                expect(global.fetch).toHaveBeenCalledTimes(i + 2);
                assertRatesUrl(curr);
            });
        });
    });
});
