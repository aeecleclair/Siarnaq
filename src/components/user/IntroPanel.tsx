import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Carousel } from "../ui/carousel";
import { IntroCarouselItems } from "./IntroCarouselItems";

export const IntroPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Présentation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Carousel
          opts={{
            watchDrag: false,
          }}
        >
          <IntroCarouselItems />
        </Carousel>
      </CardContent>
    </Card>
  );
};
