import { render } from "@testing-library/react";

import InventoryListItem from './InventoryListItem'

describe("Component", () => {
    it("should render", () => {
        expect(render(<InventoryListItem />)).toBeTruthy()
    });
});
