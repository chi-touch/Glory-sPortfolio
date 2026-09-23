"use client";

import CountUp from "react-countup"

const stats = [
    {
        num: 3,
        text: "Year of Experience",
    },
    {
        num: 8,
        text: "Project completed",
    },
    {
        num: 8,
        text: "Technologies mastered",
    },
    {
        num: 500,
        text: "Code Commits",
    },
]

const Stats = () => {
  return (
    <section className="pt-4 pb-12 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-6 sm:px-12 xl:px-20 max-w-[1280px]">
            <div className="flex flex-wrap gap-6 max-w-[80vm] mx-auto xl:max-w-none">
                {stats.map((item, index) => {
                    return (
                        <div
                         className="flex-1 flex gap-4 items-center justify-center text-center"
                         key={index}
                        >
                            <CountUp 
                             end={item.num}
                             duration={5}
                             delay={2}
                             className="text-4xl lg:text-6xl font-extrabold"
                            />
                            <p className={`${
                                item.text.length <15 ? "max-x-[100px]" : "max-w-[150px]"
                            } leading-snug text-white/80`}
                            >
                                {item.text}</p>

                        </div>
                    )
                })}

            </div>
        </div>
    </section>
  )
}

export default Stats