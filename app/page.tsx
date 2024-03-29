
import PageContainer from "@/components/page-container";
import {Poppins} from 'next/font/google'
import ButtonJoin from "@/components/button-join";
const poppins = Poppins({weight: "900", subsets: ['latin']})

const smallPoppins = Poppins({weight: "400", subsets: ['latin']})
export default function Home() {


  return (
      <PageContainer>
              <div className={"my-32 sm:my-20 md:my-10 flex flex-col items-center justify-center gap-4 h-[60vh] sm:h-[70vh] md:h-[70vh]"}>
                  <h1 className={`${poppins.className} text-3xl sm:text-4xl md:text-7xl`}>Light Paris Rp</h1>
                  <p className={`${smallPoppins.className} text-2xl sm:text-3xl md:text-5xl font-normal`}>Viens découvrir notre serveur .</p>
                  <ButtonJoin variant={"discord"} url={"/whitelist"} inSite={true} >
                      <p className={`${poppins.className} text-xl md:text-2xl w-full`}>Nous rejoindre</p>
                  </ButtonJoin>
              </div>
      </PageContainer>
  )
}
