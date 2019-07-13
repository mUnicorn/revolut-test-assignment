import {mount} from "enzyme";
import Wallet from "../Wallet";
import Slides from "../Slides";
import Comp from ".";

describe("App integration", () => {
    const render = () => mount(<Comp />);
    const setWithdrawWallet = (comp, dir) => {
        comp.find(Slides).first()
    }

    it("Render wallets", () => {
        const comp = render();
        const wallets = comp.find(Wallet);

        expect(wallets.first().props().currency).toEqual("GBP");
        expect(wallets.last().props().currency).toEqual("USD");
    });

    it("Render exchange rate", () => {});

    it("Able to select withdraw and tranfer wallets", () => {
        const comp = render();
        const slides = comp.find('[data-test="slides"]');

        expect(slides.length).toEqual(2);
    });
});
