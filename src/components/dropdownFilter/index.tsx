import { DropdownFilterProps } from "@/interfaces";
import { Container } from "./styles";
import { Funnel } from "phosphor-react";

export default function DropdownFilter({
  setSelectedFilter,
  selectedFilter,
}: DropdownFilterProps) {
  return (
    <Container>
      <div>
        <Funnel size={18} />

        <select
          name="filterSelect"
          id="filterSelect"
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
        >
          <option value="all" id="all">
            All
          </option>
          <option value="shirt" id="shirt">
            Shirts
          </option>
          <option value="hoodie" id="hoodie">
            Hoodies
          </option>
          <option value="pants" id="pants">
            Pants
          </option>
        </select>
      </div>
    </Container>
  );
}
