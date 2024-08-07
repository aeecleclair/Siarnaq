import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Carousel } from "../ui/carousel";
import { IntroCarouselItems } from "./IntroCarouselItems";
import { useUser } from "@/hooks/useUser";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";

export const IntroPanel = () => {
  const t = useTranslations("IntroPanel");
  const { userId } = useTokenStore();
  const { user, refetch } = useUser(userId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("presentation")}</CardTitle>
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
