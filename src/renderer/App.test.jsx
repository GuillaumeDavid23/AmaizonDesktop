import { render } from "@testing-library/react";
import App from "./App";

test("Expect App component to render", () => {
    expect(render(<App />)).toBeTruthy();
});
