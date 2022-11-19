import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeLocales,
  LANGUAGE_EN,
  LANGUAGE_VI,
  appStateSelector,
} from "slices/core/appState";

const HeaderAuth = () => {
  const { t, i18n } = useTranslation("common");
  const { language } = useSelector(appStateSelector);

  const dispatch = useDispatch();

  const handleClick = (language) => {
    if (language === LANGUAGE_VI) {
      dispatch(changeLocales(LANGUAGE_EN));
      i18n.changeLanguage(LANGUAGE_EN);
    } else {
      dispatch(changeLocales(LANGUAGE_VI));
      i18n.changeLanguage(LANGUAGE_VI);
    }
  };

  return (
    <div className="header-auth">
      <div>
        <Link to="/">
          <span className="logo logo__md">Quiz Test</span>
        </Link>
      </div>

      <Button
        type="link"
        onClick={() => handleClick(language)}
        className="btn-space-none"
      >
        {t("header.language")}&nbsp;
        {language === LANGUAGE_VI ? (
          <img
            className="language"
            src={require("../../assets/img/US.png")}
            alt=""
          />
        ) : (
          <img
            className="language"
            src={require("../../assets/img/VI.png")}
            alt=""
          />
        )}
      </Button>
    </div>
  );
};

export default HeaderAuth;
