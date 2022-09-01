import { render } from "@testing-library/react";

import AgentDetails from "./AgentDetails";

describe("AgentDetails", () => {
    it("should render", () => {
        expect(render(<AgentDetails />)).toBeTruthy();
    });
});
