import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "../../utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {[
          "v1734594700/Green_White_Modern_Optometrist_Optician_Banner_dimd8w.png",
          "v1734595217/Purple_and_Blue_Illustration_Eye_Health_Tips_Instagram_Post_1_qqpzvk.png",
          "v1734594926/Eye-exam-1-1080x675_fnmfhn.jpg",
          "v1734594924/Top-Tips-to-Keep-Kids-Eyes-Health_j2lwtt.webp",
          "v1734595613/Blog_Banner5_y3p8er.png",
        ]
          .map((filename) => getDummyImage(filename)) // Correct usage here
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
