import { render } from "@testing-library/react";

import CustomerDetails from "./CustomerDetails";

describe("CustomerDetails", () => {
    it("should render", () => {
        expect(render(<CustomerDetails />)).toBeTruthy();
    });
});
