import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Phone,
  MapPin,
  X,
  ArrowRight,
} from "lucide-react";

import PageHero from "../../components/PageHero/PageHero";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import BranchCard from "../../components/BranchCard/BranchCard";
import NetworkMap from "../../components/Illustrations/NetworkMap";

import {
  BRANCHES,
  NETWORK_CITIES,
  COMPANY,
} from "../../data/content";

import "./Branches.css";


const GENERIC_PHOTOS = [
  "/images/hero-truck-road-pin.jpg",
  "/images/hero-truck-drone-city.jpg",
  "/images/hero-truck-night.jpg",
  "/images/hero-truck.jpg",
];


function genericPhotoFor(city) {
  const sum = city
    .split("")
    .reduce(
      (acc, ch) => acc + ch.charCodeAt(0),
      0
    );

  return GENERIC_PHOTOS[
    sum % GENERIC_PHOTOS.length
  ];
}


export default function Branches() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] =
    useState(null);


  const cityCount = NETWORK_CITIES.length;


  const filteredCities = useMemo(() => {
    return NETWORK_CITIES.filter((city) =>
      city
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);


  const activeBranch = selectedCity
    ? BRANCHES.find(
        (branch) =>
          branch.city.toLowerCase() ===
          selectedCity.toLowerCase()
      )
    : null;


  const modalData = selectedCity
    ? activeBranch
      ? {
          ...activeBranch,
          isBranch: true,
        }
      : {
          city: selectedCity,

          tag: "Service Area",

          img:
            genericPhotoFor(selectedCity),

          address: `We provide complete packing, moving and relocation services in ${selectedCity}. Reach out for a free, personalised quote.`,

          isBranch: false,
        }
    : null;


  return (
    <>
      <PageHero
        eyebrow="Our Branches"
        title="Always near you, across India"
        desc={`With a strong Pan-India network, APM Relocation is always nearby to serve you better — ${cityCount} cities and counting.`}
      />


      {/* ======================================
          BANNER
      ====================================== */}

      <div className="container branches-banner">
        <img
          className="branches-banner__img"
          src="/images/branches-road.jpg"
          alt="APM Relocation truck en route across India"
          width={1600}
          height={784}
        />
      </div>


      {/* ======================================
          BRANCH OFFICES
      ====================================== */}

      <section className="section branches-main">
        <div className="container">

          <SectionHeading
            eyebrow="Head & Regional Offices"
            title="Our branch offices"
            align="center"
          />


          <div className="branches__grid">
            {BRANCHES.map((branch, index) => (
              <button
                type="button"
                key={branch.city}
                className="branch-card__trigger"
                onClick={() =>
                  setSelectedCity(branch.city)
                }
                aria-label={`View details for ${branch.city}`}
              >
                <BranchCard
                  branch={branch}
                  index={index}
                />
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* ======================================
          SERVICE NETWORK
      ====================================== */}

      <section className="section network">
        <div className="container network__layout">

          <div className="network__copy">

            <SectionHeading
              eyebrow="Service Network"
              title={`We are present in ${cityCount} cities`}
            />


            {/* SEARCH */}

            <div className="network__search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search your city..."
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
              />
            </div>


            {/* CITY LIST */}

            <motion.div
              layout
              className="network__cities"
            >
              {filteredCities.map(
                (city) => (
                  <motion.button
                    type="button"
                    layout
                    key={city}
                    className="network__city"
                    onClick={() =>
                      setSelectedCity(city)
                    }
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <span className="network__city-icon">
                      <MapPin
                        size={13}
                        strokeWidth={2.4}
                      />
                    </span>


                    <span className="network__city-text">

                      <strong>
                        {city}
                      </strong>

                      <span>
                        {COMPANY.name}
                        {" · "}
                        Since {COMPANY.since}
                      </span>

                    </span>
                  </motion.button>
                )
              )}


              {/* EMPTY SEARCH */}

              {filteredCities.length === 0 && (
                <div className="network__empty">

                  <p>
                    Can't find your city?
                    We may still be able to help.
                  </p>


                  <a
                    href={`tel:${COMPANY.phone1}`}
                    className="btn btn-primary"
                  >
                    <Phone size={16} />

                    Call {COMPANY.phone1}
                  </a>

                </div>
              )}

            </motion.div>
          </div>


          {/* MAP */}

          <div className="network__map">
            <NetworkMap
              className="network__map-img"
            />
          </div>

        </div>
      </section>


      {/* ======================================
          CITY DETAIL MODAL
      ====================================== */}

      <AnimatePresence>
        {modalData && (
          <motion.div
            className="city-modal__backdrop"

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.25,
            }}

            onClick={() =>
              setSelectedCity(null)
            }
          >

            <motion.div
              className="city-modal"

              initial={{
                opacity: 0,
                y: 24,
                scale: 0.97,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: 16,
                scale: 0.97,
              }}

              transition={{
                duration: 0.3,
                ease: [
                  0.2,
                  0.8,
                  0.2,
                  1,
                ],
              }}

              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* CLOSE */}

              <button
                type="button"
                className="city-modal__close"
                onClick={() =>
                  setSelectedCity(null)
                }
                aria-label="Close"
              >
                <X size={18} />
              </button>


              {/* IMAGE */}

              <div className="city-modal__media">

                <img
                  src={modalData.img}
                  alt={`${modalData.city} — ${COMPANY.name}`}
                />


                <div className="city-modal__gradient" />


                <span className="city-modal__brand">

                  <span className="city-modal__brand-mark">
                    {COMPANY.name.charAt(0)}
                  </span>

                  {COMPANY.name}

                </span>

              </div>


              {/* CONTENT */}

              <div className="city-modal__body">

                <div className="city-modal__top">

                  <span className="city-modal__icon">
                    <MapPin size={18} />
                  </span>


                  <span className="city-modal__tag">
                    {modalData.tag}
                  </span>

                </div>


                <h3>
                  {modalData.city}
                </h3>


                <p>
                  {modalData.address}
                </p>


                <span className="city-modal__since">
                  {COMPANY.tagline}
                  {" · "}
                  Since {COMPANY.since}
                </span>


                <div className="city-modal__actions">

                  <a
                    href={`tel:${COMPANY.phone1}`}
                    className="btn btn-outline"
                  >
                    <Phone size={16} />

                    Call Now
                  </a>


                  <a
                    href="/contact"
                    className="btn btn-primary"
                  >
                    Get Free Quote

                    <ArrowRight size={16} />
                  </a>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}