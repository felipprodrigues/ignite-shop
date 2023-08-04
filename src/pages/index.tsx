import Image from "next/image";
import { HomeContainer, Product } from "./home";

import { useKeenSlider } from "keen-slider/react";

import camisa1 from "../assets/igniteAboardShirt.png";
import camisa2 from "../assets/igniteExplorerShirt.png";
import camisa3 from "../assets/igniteLabShirt.png";
import camisa4 from "../assets/igniteMarathonShirt.png";

import "keen-slider/keen-slider.min.css";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camisa1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta y</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa3} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta z</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camisa4} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta z</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
