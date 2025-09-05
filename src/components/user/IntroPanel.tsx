import { IntroCarouselItems } from "./IntroCarouselItems";

import { useUser } from "@/hooks/useUser";
import { useTokenStore } from "@/stores/token";

import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Carousel } from "../ui/carousel";

export const IntroPanel = () => {
  const t = useTranslations("introPanel");
  const { userId } = useTokenStore();
  const { user, refetch } = useUser(userId);
  return (
    <Card className="max-md:w-auto">
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
