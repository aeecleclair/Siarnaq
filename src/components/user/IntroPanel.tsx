import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Carousel } from "../ui/carousel";
import { IntroCarouselItems } from "./IntroCarouselItems";
import { useUser } from "@/hooks/useUser";
import { useTokenStore } from "@/stores/token";

export const IntroPanel = () => {
  const { userId } = useTokenStore();
  const { user, refetch } = useUser(userId);
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
          {user && <IntroCarouselItems user={user} refetch={refetch} />}
        </Carousel>
      </CardContent>
    </Card>
  );
};
