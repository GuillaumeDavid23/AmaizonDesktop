import { render } from "@testing-library/react";

import ConnectForm from "./ConnectForm";

describe("Component", () => {
    it("should render", () => {
        expect(render(<ConnectForm />)).toBeTruthy();
    });
});
