import { render } from "@testing-library/react";

import CustomerAdd from "./CustomerAdd";

describe("CustomerAdd", () => {
    it("should render", () => {
        expect(render(<CustomerAdd />)).toBeTruthy();
    });
});
