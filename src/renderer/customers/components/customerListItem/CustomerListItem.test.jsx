import { render } from "@testing-library/react";

import CustomerListItem from "./CustomerListItem";

describe("Component", () => {
    it("should render", () => {
        expect(render(<CustomerListItem />)).toBeTruthy();
    });
});
