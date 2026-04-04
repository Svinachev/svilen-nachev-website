import { useEffect } from "react";

interface LinkWithPreviewProps {
  href: string;
  children: React.ReactNode;
}

function LinkWithPreview({ href, children }: LinkWithPreviewProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-60">
      {children}
    </a>
  );
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
        {/* Left sidebar with image */}
        <div className="lg:col-span-1">
          <div className="aspect-square overflow-hidden mb-6">
            <img
              src="/images/others/svilen_nachev_by_elena_nacheva.jpg"
              alt="Svilen Nachev"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="mb-4">About Me</h1>
            <p className="text-base leading-relaxed mb-4">
              Born in 1979 in the small bulgarian town of Svishtov located on Danube river. I'm interested in photography since my teens, but started shooting the streets in 2011.
            </p>
            <p className="text-base leading-relaxed italic">
              "For me photography is passion, enjoyment, an escape from the ordinary, way of documenting life and expressing myself. My main reason to shoot is to take better pictures, exploring the streets for something hidden and to catch a glimpse of what life was like for the next generations."
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">
              Co-founder of{" "}
              <LinkWithPreview href="https://www.instagram.com/streetphoto.lab/">
                Street Photo Lab
              </LinkWithPreview>
            </p>
            <p className="text-sm mb-4">
              Member of{" "}
              <LinkWithPreview href="https://fullfrontalflash.com/photographers/svilen-nachev/">
                Full Frontal
              </LinkWithPreview>{" "}
              (from 2022) and{" "}
              <a href="#" className="underline hover:opacity-60">
                BULB
              </a>{" "}
              (2017 - 2022)
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Publications and Exhibitions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LinkWithPreview href="https://www.collater.al/svilen-nachev-in-between-photography/">
                  Collater.al (2025)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://mintpublishing.bigcartel.com/product/animal-planet">
                  Mint Publishing (2025)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://host.gallery/exhibitions/if-invitation-en/">
                  Hostgallery (2025)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://photoanthology.org/projects/the-illusion-of-meaning">
                  PhotoAnthology (2025)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.pep.photography/parallel-realities">
                  PEP (2025)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://bumpbooks.com/zines-1/svilen-nachev-thrown-into-nature">
                  Bump Books (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://everythingisephemere.com/publications/p/happening-happenstance">
                  ephemere. (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.dodho.com/dream-of-the-flesh-by-svilen-nachev/">
                  Dodho (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://obscuramag.com/%D1%81%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5/">
                  Obscura (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.lensculture.com/articles/lensculture-editors-lensculture-new-york-exhibition-2024">
                  LensCulture (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.thezonezine.com/issue/z3ne/">
                  The Zone (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://contemplart20.wixsite.com/contemplart/about-5-1">
                  Les Balkannes (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.eyeshotstreetphotography.com/svilen-nachev-2/">
                  Eyeshot (2023)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://fkmagazine.lv/2023/07/18/the-illusion-of-meaning/">
                  FK (2023)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.eyeshotstreetphotography.com/shop/magazines/eyeshot-magazine-8-bulgaria/">
                  Eyeshot (2022)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.balkanium.org/post/in-between-izme%C4%91u">
                  Balkanium (2021)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://phodar.net/editions/2021?author=Svilen_Nachev">
                  Phodar (2021)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://monochrome-hub.com/collections/wander-for-a-wonder">
                  Monochrome-hub (2021)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://kioskderdemokratie.blogspot.com/2017/02/ordinary-life-svilen-nachev-bulgaria.html">
                  Kiosk of Democracy (2018)
                </LinkWithPreview>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Interviews</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <LinkWithPreview href="https://www.9lives-magazine.com/114393/2025/05/26/rencontre-avec-le-photographe-svilen-nachev-photographier-lindicible/">
                  9 Lives Magazine (2025)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://upphotographers.com/interviews/interview-with-svilen-nachev/">
                  Upphotographers (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://popsonality.blogspot.com/2024/06/svilen-nachev-has-pop-sonality.html">
                  Popsonality (2024)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://antondaskalov.photography/svilen-nachev/">
                  Bulgarian Photography archive (2023)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://fullfrontalflash.com/2022/03/06/svilen-nachev/">
                  Full Frontal Flash (2022)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://photoworld.bg/en/to-capture-the-spirit-of-the-time-with-svilen-nachev/">
                  Photoworld (2021)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.exibartstreet.com/news/svilen-nachev-the-2019-exibart-street-contest-winner/">
                  Exibart (2020)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://egoist.bg/vizualnata-tajna-v-street-fotografiyata-na-svilen-nachev/">
                  Egoist (2020)
                </LinkWithPreview>
              </li>
              <li>
                <LinkWithPreview href="https://www.streethunters.net/blog/2017/09/02/interview-with-june-monthly-theme-contest-winner-svilen-nachev/">
                  Streethunters (2017)
                </LinkWithPreview>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">Awards and Nominations</h3>
            <ul className="space-y-2 text-sm">
              <li>2025 Pisa Street Photography International Awards - Honorable mention</li>
              <li>2023 LensCulture Street Photography Awards - Juror's Pick</li>
              <li>2023 Gomma Photography Grant 2022, GNF New Flavours Award - Finalist</li>
              <li>2022 Eyeshot Open Call, Italy - Honorable mention</li>
              <li>2021 Phodar Biennial, Bulgaria - Finalist</li>
              <li>2021 DFA Spring Awards - Finalist</li>
              <li>2020 MSPF Miami Street Photography Festival, USA - Finalist</li>
              <li>2020 Moment Street Photo Awards, Poland - Finalist</li>
              <li>2020 LSPF London Street Photography Festival, UK - Finalist</li>
              <li>2019 Exibart Street Contest - Winner</li>
              <li>2019 StreetPhoto San Francisco, International Street Photography Festival, USA - Finalist</li>
              <li>2019 Kolga Tbilisi Photo Award, Georgia - One Shot Category, Shortlisted</li>
              <li>2019 BG Press Photo, Bulgaria - First Prize For Series</li>
              <li>2018 Made In Bruxsel By BSPF Brussel Street Photography Festival, Belgium - Finalist</li>
              <li>2018 ISPF Italian Street Photo Festival, Rome, Italy - Finalist</li>
              <li>2017 BG Press Photo, Bulgaria - The Grand Prize Of The Name Of "Shavarsh Artin" For Humanitarian Photography; First Prize For Series</li>
              <li>2017 MSPF Miami Street Photography Festival, USA - Finalist</li>
              <li>2017 BSPF Brussels Street Photography Festival, Belgium - Finalist</li>
              <li>2017 PhoS Athens Street Photography Festival, Greece - Finalist</li>
              <li>2017 Photoacademica, Sofia, Bulgaria - First Prize, Reportage</li>
              <li>2017 International Photographic Contest "The Balkans" 2nd Edition - Winner</li>
              <li>2015 Award.Io - Light Chaser Exhibition, London, UK - Finalist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
