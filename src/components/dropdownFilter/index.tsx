import { Container } from "./styles";

export default function DropdownFilter() {
  return (
    <Container>
      <select name="filterSelect" id="filterSelect">
        <option value="all">All</option>
        <option value="item1">Shirts</option>
        <option value="item1">Hoodies</option>
        <option value="item1">Pants</option>
      </select>
    </Container>
  );
}
