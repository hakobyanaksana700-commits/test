import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * ЗАМЕНА РЕАЛЬНОГО ФОТО/ВИДЕО ЧЕЛОВЕКА
 * -------------------------------------
 * Официального фото/видео человека в проекте пока нет, поэтому CSS-имитация
 * человека не используется (это запрещено требованиями сцены). Ниже — один
 * переключатель: как только в public/ появится реальный кадр (фото или
 * видео человека ночью со смартфоном ЭКРАНОМ К СЕБЕ, камера сбоку-сзади под
 * углом 3/4, экран НЕ виден зрителю), укажите путь здесь — остальная
 * анимация (кинематографичное приближение, текст, логотипы) менять не нужно.
 *
 * Пример: PERSON_ASSET_SRC = staticFile("person-phone-night.jpg");
 */
const PERSON_ASSET_SRC: string | null = null;

const DECLINED_TEXT = "ПЛАТЁЖ ОТКЛОНЁН";

// Слоты официальных логотипов — файлов в проекте нет, поэтому вместо
// самодельных лого рисуются нейтральные заглушки-плейсхолдеры с подписью.
// Как только появится официальный PNG/SVG, добавьте его в public/logos/ и
// подставьте путь в поле iconSrc — верстка и позиционирование не изменятся.
type LogoDef = {
  label: string;
  iconSrc: string | null;
};

const LOGOS: LogoDef[] = [
  { label: "ChatGPT", iconSrc: null },
  { label: "Google", iconSrc: null },
  { label: "Apple", iconSrc: null },
  { label: "Alipay", iconSrc: null },
  { label: "Cloud", iconSrc: null },
];

const CinematicCameraPush: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames - 1], [1, 1.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "50% 42%",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Слот под реальный кадр человека. Пока asset не подключён — показывает
 * абстрактную кинематографичную ночную подложку (без имитации человека
 * средствами CSS): холодный синий градиент, тёплые боке-огни, виньетка и
 * подпись, обозначающая, что именно сюда встанет фото/видео.
 */
const PersonVisualLayer: React.FC = () => {
  if (PERSON_ASSET_SRC) {
    return (
      <Img
        src={PERSON_ASSET_SRC}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 38%",
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 90% at 50% 30%, #16273f 0%, #0a1526 45%, #030710 100%)",
      }}
    >
      {/* Тёплые боке-источники света на фоне холодной ночной сцены */}
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          top: "18%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(255,183,94,0.28) 0%, rgba(255,183,94,0) 70%)",
          filter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          top: "58%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(255,157,66,0.22) 0%, rgba(255,157,66,0) 70%)",
          filter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          bottom: "8%",
          left: "20%",
          background:
            "radial-gradient(circle, rgba(94,168,255,0.18) 0%, rgba(94,168,255,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Место для реального кадра — рамка-заглушка */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 90px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            border: "2px dashed rgba(255,255,255,0.28)",
            borderRadius: 24,
            padding: "48px 32px",
            textAlign: "center",
            backgroundColor: "rgba(6,12,24,0.35)",
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 30,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              marginBottom: 14,
            }}
          >
            Место для реального кадра
          </div>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 22,
              lineHeight: 1.5,
              color: "rgba(191,213,255,0.75)",
            }}
          >
            Человек ночью держит смартфон экраном к себе.
            <br />
            Камера сбоку-сзади, ракурс 3/4. Экран телефона
            <br />
            зрителю не виден.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(120% 85% at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,4,12,0.55) 85%, rgba(0,2,8,0.85) 100%)",
      pointerEvents: "none",
    }}
  />
);

const ColdColorGrade: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: "rgba(20,50,90,0.16)",
      mixBlendMode: "overlay",
      pointerEvents: "none",
    }}
  />
);

const DeclinedHeadline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearAt = 30; // ~1 секунда с начала сцены

  const entrance = spring({
    frame: frame - appearAt,
    fps,
    config: {
      damping: 200,
      stiffness: 120,
      mass: 0.9,
    },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entrance, [0, 1], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(entrance, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const underlineWidth = interpolate(
    frame,
    [appearAt + 6, appearAt + 22],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < appearAt) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "58%",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          textAlign: "center",
          padding: "0 48px",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: 800,
            fontSize: 82,
            letterSpacing: 2,
            color: "#FFFFFF",
            textShadow:
              "0 0 40px rgba(255,90,90,0.45), 0 6px 24px rgba(0,0,0,0.65)",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          {DECLINED_TEXT}
        </div>
        <div
          style={{
            margin: "18px auto 0",
            height: 4,
            width: `${underlineWidth}%`,
            maxWidth: 340,
            background:
              "linear-gradient(90deg, rgba(255,90,90,0) 0%, #FF5A5A 50%, rgba(255,90,90,0) 100%)",
            borderRadius: 4,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const LogoSlot: React.FC<{ logo: LogoDef; delay: number }> = ({
  logo,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, stiffness: 140, mass: 0.8 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(entrance, [0, 1], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        width: 128,
        height: 92,
        borderRadius: 16,
        border: "1.5px dashed rgba(255,255,255,0.35)",
        backgroundColor: "rgba(10,18,32,0.55)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}
    >
      {logo.iconSrc ? (
        <Img
          src={logo.iconSrc}
          style={{ width: 36, height: 36, objectFit: "contain" }}
        />
      ) : (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.4)",
          }}
        />
      )}
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 15,
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
        }}
      >
        {logo.label}
      </div>
    </div>
  );
};

const LogoStrip: React.FC = () => {
  const frame = useCurrentFrame();
  const stripStart = 48;

  const opacity = interpolate(frame, [stripStart, stripStart + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < stripStart) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 130,
      }}
    >
      <div
        style={{
          opacity,
          display: "flex",
          flexDirection: "row",
          gap: 18,
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: 940,
        }}
      >
        {LOGOS.map((logo, index) => (
          <LogoSlot
            key={logo.label}
            logo={logo}
            delay={stripStart + index * 4}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#03060c", overflow: "hidden" }}>
      <CinematicCameraPush>
        <PersonVisualLayer />
      </CinematicCameraPush>
      <ColdColorGrade />
      <Vignette />
      <DeclinedHeadline />
      <LogoStrip />
    </AbsoluteFill>
  );
};
