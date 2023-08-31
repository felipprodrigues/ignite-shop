import { Container } from "./styles";

export default function DropdownFilter() {
  return (
    <Container>
      <select name="filterSelect" id="filterSelect">
        <option value="all">All</option>
        <option value="item1">Item1</option>
        <option value="item1">Item2</option>
        <option value="item1">Item3</option>
      </select>
    </Container>
  );
}
