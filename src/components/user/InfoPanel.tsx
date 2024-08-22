import { useUser } from "@/hooks/useUser";
import { useUserPayments } from "@/hooks/useUserPayments";
import { useUserPurchases } from "@/hooks/useUserPurchases";
import { useTokenStore } from "@/stores/token";
import { useTranslations } from "next-intl";
import {
  HiOutlineBanknotes,
  HiOutlineCalendar,
  HiOutlineDevicePhoneMobile,
  HiOutlineLink,
  HiOutlineNewspaper,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const InfoPanel = () => {
  const t = useTranslations("Info");

  const { userId } = useTokenStore();
  const { user } = useUser(userId);
  const { purchases, total: totalToPay } = useUserPurchases(userId);
  const { total: totalPaid } = useUserPayments(userId);

  const remainingToPay = (totalToPay || 0) - (totalPaid || 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("information")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineCalendar className="h-4 w-4 mr-2" />
          {t("cdrPhysiqueTitle")}
        </h3>
        <div>{t("cdrPhysiqueSubtitle")}</div>
        <div>{t("cdrPhysiqueDescription")}</div>
        <div className="font-bold">{t("cdrPhysiqueMandatoryWarning")}</div>

        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineNewspaper className="h-4 w-4 mr-2" />
          {t("facebookTitle")}
        </h3>
        <div>{t("facebook")}</div>
        <div className="pl-10">
          <a
            href="https://www.facebook.com/groups/admis2024"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineLink className="h-4 w-4 mr-2" />
            Groupe des Admis 2024
          </a>
        </div>
        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineDevicePhoneMobile className="h-4 w-4 mr-2" />
          {t("myECLTitle")}
        </h3>
        <div>{t("myECL")}</div>
        <div className="pl-10">
          <a
            href="https://apps.apple.com/fr/app/myecl/id6444443430"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineLink className="h-4 w-4 mr-2" />
            Téléchargez MyECL sous iOS/iPadOS
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=fr.myecl.titan"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineLink className="h-4 w-4 mr-2" />
            Téléchargez MyECL sous Android
          </a>
        </div>
        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineUserGroup className="h-4 w-4 mr-2" />
          {t("elementTitle")}
        </h3>
        <div>{t("element")}</div>
        <div className="pl-10">
          <ol className="list-decimal">
            <li>
              <a
                href="https://element.io/download"
                className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
              >
                <HiOutlineLink className="h-4 w-4 mr-2" />
                {t("elementStep1")}
              </a>
            </li>
            <li>{t("elementStep2")}</li>
            <li>
              {t("elementStep3")} <code>myecl.fr</code>
            </li>
            <li>{t("elementStep4")}</li>
          </ol>
        </div>
        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineBanknotes className="h-4 w-4 mr-2" />
          {t("cautionTitle")}
        </h3>
        <div>
          {t("cautionDescription")} &laquo;
          <span className="italic"> AEECL - WEI </span> &raquo;.
        </div>
        <div>{t("cautionInstructions")}</div>
      </CardContent>

      <CardFooter className="px-6 py-4"></CardFooter>
    </Card>
  );
};
