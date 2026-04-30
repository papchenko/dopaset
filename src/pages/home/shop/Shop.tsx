import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { toast } from "react-toastify";
import { IoResize } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";

import { useAppDispatch } from "../../../store/hooks";
import { addToCart } from "../../../store/slices/cartSlice";

import { useAppSelector } from "../../../store/hooks";

import "swiper/css";
import "swiper/css/navigation";

type Sticker = {
  id: number;
  title: string;
  description: string;
  image: string;
  size: string;
  price: string;
  rating: number;
};

const mockStickers: Sticker[] = [
  {
    id: 1,
    title: "Focus Mode",
    description: "Eliminate distractions and lock into deep work.",
    image: "/src/assets/shop_image1.png",
    size: "10x10 cm",
    price: "99",
    rating: 4.9,
  },
  {
    id: 2,
    title: "No Scroll",
    description: "Break endless scrolling habits instantly.",
    image: "/src/assets/shop_image2.png",
    size: "10x10 cm",
    price: "99",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Dopamine Control",
    description: "Regulate stimulation and regain clarity.",
    image: "/src/assets/shop_image3.png",
    size: "10x10 cm",
    price: "99",
    rating: 4.9,
  },
];

export default function Shop() {


  const dispatch = useAppDispatch();
  const itemsInCart = useAppSelector(state => state.cart.items);

  const handleAdd = (item: Sticker) => {
  const exists = itemsInCart.find(i => i.id === item.id);

  if (exists) {
    toast.info("This item is already in your cart");
    return;
  }

  dispatch(
    addToCart({
      id: item.id,
      title: item.title,
      price: Number(item.price),
      image: item.image,
    })
  );

  toast.success(`${item.title} added to cart`);
};

  const [items, setItems] = useState<Sticker[]>([]);

  useEffect(() => {
    setItems(mockStickers);
  }, []);


  return (
    <section className="w-full pt-24 pb-0" id="shop">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-400">
            Dopaset Shop
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Minimal Control Stickers
          </h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop
          navigation={{
            prevEl: ".dopaset-prev",
            nextEl: ".dopaset-next",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          modules={[Autoplay, Navigation]}
          className="relative"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition">
                <div className="relative group flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-72 h-56 object-cover"
                  />

                  <button
                    onClick={() => handleAdd(item)}
                    className="absolute top-4 right-4 bg-[#586ba4] hover:bg-opacity-90 text-white text-base px-4 py-2 rounded-full backdrop-blur"
                  >
                    <FaShoppingCart />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-zinc-300 mt-3 text-sm">
                    <IoResize />
                    <span>{item.size}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl text-white font-bold">
                     ₴ {item.price}
                    </span>

                    {/* <span className="text-xs text-zinc-400">
                      ★ {item.rating}
                    </span> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-4 mt-8">
          <button className="dopaset-prev px-4 py-2 rounded-lg border border-zinc-800 text-white hover:bg-zinc-900">
             <FaArrowLeft />
          </button>
          <button className="dopaset-next px-4 py-2 rounded-lg border border-zinc-800 text-white hover:bg-zinc-900">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}