import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage"
import { enableAISettings } from "../helpers/android/enableAISettings";
import { doLoginFlow } from "../helpers/android/loginFlow";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";
import { doReflectFlow } from "../helpers/android/reflectFlow";

describe("Create check-in with reflection and takeaways feature", () => {
    let createCheckin : CreateCheckinPage;

    it("Should create a check-in with reflection and takeaways feature", async () => {
        createCheckin = await doReflectFlow();

        await verify(createCheckin.areTakeawaysDisplayed());
        await createCheckin.tapAllButtons();
        await createCheckin.tapDoneButton();
        await createCheckin.tapNextButton();
        await verify(createCheckin.dataEntriesScreenDisplayed());
        await browser.pause(2000); // wait for the AI processing to complete
        await createCheckin.tapSaveButton();
        await browser.pause(2000); // wait for the save action to complete
        if (await createCheckin.handleFirstTimeTooltip()) {
            await verify(createCheckin.isCheckinCompleted());
        }
        await verify(createCheckin.isCheckinCompleted());
    });
});
