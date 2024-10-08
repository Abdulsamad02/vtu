import Image from "next/image";
import Link from "next/link";

const services = [
  {
    name: "Airtime TopUp",
    img: "airtime",
  },
  {
    name: "Buy Data",
    img: "data",
  },
  {
    name: "Airtime to cash",
    img: "airtime2cash",
  },
  {
    name: "Cable Subscription",
    img: "cable",
  },
  {
    name: "Electricity Bills",
    img: "utility",
  },
  {
    name: "Education",
    img: "education",
  },
  {
    name: "Bonus to wallet",
    img: "fund",
  },
  {
    name: "Referral",
    img: "referral",
  },
];

export default function Services() {
  return (
    <section className="flex flex-wrap  justify-center gap-1 md:justify-around">
      {services.map((item) => (
        <Link
          href={item.name.replace(/ /g, "-").toLowerCase()}
          passHref
          key={item.name.replace(" ", "_")}
        >
            <div className="hover:text-primary my-3 mx-1 flex h-40 w-40 cursor-pointer flex-col items-center justify-center bg-white shadow-md transition-all hover:shadow-xl md:mx-0  md:w-[11.5rem]">
              <Image
                src={`/${item.img}.png`}
                priority={true}
                width={90}
                height={90}
                objectFit="contain"
                alt={item.name}
              />
              <h4 className="text-center font-medium ">{item.name}</h4>
            </div>
        </Link>
      ))}
    </section>
  );
}
