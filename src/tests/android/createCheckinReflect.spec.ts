import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { verify } from "../helpers/android/test-verification";

import { doReflectFlow } from "../helpers/android/reflectFlow";

describe("Create check-in with reflection feature", () => {
    let createCheckin : CreateCheckinPage;
    
    it("Should create a check-in with reflection feature", async() => {
        createCheckin = await doReflectFlow();

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