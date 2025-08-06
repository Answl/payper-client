const mapKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

export const loadMapScript = () => {
  const script = document.createElement("script");
  script.id = "kakao-map-sdk";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&autoload=false`;
  script.async = true;
};

export const initMap = () => {};
