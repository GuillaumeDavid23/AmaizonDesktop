import { render } from "@testing-library/react";

import Login from "./Login";

describe("Login component", () => {
    it("should render", () => {
        expect(render(<Login />)).toBeTruthy();
    });
});
