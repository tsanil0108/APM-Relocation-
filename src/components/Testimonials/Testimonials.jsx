import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { TESTIMONIALS } from "../../data/content";
import { supabase } from "../../lib/supabase";

import "./Testimonials.css";


export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const allTestimonials = useMemo(() => {
    const databaseReviews = reviews.map((item) => ({
      name: item.name,
      city: item.city,
      rating: item.rating,
      quote: item.review,
      source: "database",
    }));

    return [...TESTIMONIALS, ...databaseReviews];
  }, [reviews]);

  const current =
    allTestimonials[index] || TESTIMONIALS[0];

  const fetchReviews = async () => {
    setLoadingReviews(true);

    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, name, city, rating, review, created_at"
      )
      .eq("approved", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Error loading reviews:",
        error
      );

      setLoadingReviews(false);
      return;
    }

    setReviews(data || []);
    setLoadingReviews(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (
      index >= allTestimonials.length &&
      allTestimonials.length > 0
    ) {
      setIndex(0);
    }
  }, [allTestimonials.length, index]);

  const go = (direction) => {
    if (!allTestimonials.length) return;

    setIndex(
      (currentIndex) =>
        (currentIndex +
          direction +
          allTestimonials.length) %
        allTestimonials.length
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    const cleanName = name.trim();
    const cleanCity = city.trim();
    const cleanReview = review.trim();

    if (
      !cleanName ||
      !cleanCity ||
      !cleanReview
    ) {
      setMessage({
        type: "error",
        text: "Please fill in your name, city and review.",
      });

      return;
    }

    if (
      cleanName.length > 80 ||
      cleanCity.length > 80 ||
      cleanReview.length > 800
    ) {
      setMessage({
        type: "error",
        text: "Please keep your review within the allowed length.",
      });

      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          name: cleanName,
          city: cleanCity,
          rating,
          review: cleanReview,
          approved: false,
        },
      ]);

    if (error) {
      console.error(
        "Review submission error:",
        error
      );

      setMessage({
        type: "error",
        text: "Review could not be submitted. Please try again.",
      });

      setSubmitting(false);
      return;
    }

    setName("");
    setCity("");
    setRating(5);
    setReview("");

    setMessage({
      type: "success",
      text: "Thank you! Your review was submitted and will appear after approval.",
    });

    setSubmitting(false);
  };

  return (
    <div className="testimonials">
      <div className="testimonials__top">
        <div className="testimonials__slider">

          <div className="testimonials__quote-icon">
            <Quote
              size={48}
              strokeWidth={1.5}
            />
          </div>

          {loadingReviews && (
            <span className="testimonials__loading">
              Loading customer reviews...
            </span>
          )}

          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={`${index}-${current.name}`}
                className="testimonials__card"
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
                transition={{
                  duration: 0.4,
                  ease: [
                    0.2,
                    0.8,
                    0.2,
                    1,
                  ],
                }}
              >
                <div className="testimonials__stars">
                  {Array.from({
                    length: 5,
                  }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={17}
                      fill={
                        starIndex <
                        Math.round(
                          current.rating
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>

                <p>
                  &ldquo;
                  {current.quote}
                  &rdquo;
                </p>

                <div className="testimonials__author">
                  <span className="testimonials__avatar">
                    {current.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>

                  <div>
                    <strong>
                      {current.name}
                    </strong>

                    <small>
                      {current.city}
                    </small>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {allTestimonials.length > 1 && (
            <div className="testimonials__controls">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="testimonials__dots">
                {allTestimonials.map(
                  (_, dotIndex) => (
                    <button
                      type="button"
                      key={dotIndex}
                      className={
                        dotIndex === index
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setIndex(dotIndex)
                      }
                      aria-label={`Testimonial ${
                        dotIndex + 1
                      }`}
                    />
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="review-form-card">
          <div className="review-form-card__head">
            <span>
              Share Your Experience
            </span>

            <h3>
              Write a Review
            </h3>

            <p>
              Tell us about your moving
              experience with APM Relocation.
            </p>
          </div>

          <form
            className="review-form"
            onSubmit={handleSubmit}
          >
            <div className="review-form__row">
              <label>
                <span>Name</span>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Your name"
                  maxLength={80}
                  required
                />
              </label>

              <label>
                <span>City</span>

                <input
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(
                      event.target.value
                    )
                  }
                  placeholder="Your city"
                  maxLength={80}
                  required
                />
              </label>
            </div>

            <div className="review-form__rating">
              <span>Your Rating</span>

              <div className="review-form__stars">
                {Array.from({
                  length: 5,
                }).map((_, starIndex) => {
                  const value =
                    starIndex + 1;

                  return (
                    <button
                      key={value}
                      type="button"
                      className={
                        value <= rating
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setRating(value)
                      }
                      aria-label={`Rate ${value} star`}
                    >
                      <Star
                        size={24}
                        fill={
                          value <= rating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="review-form__message">
              <span>Review</span>

              <textarea
                value={review}
                onChange={(event) =>
                  setReview(
                    event.target.value
                  )
                }
                placeholder="How was your moving experience?"
                rows={5}
                maxLength={800}
                required
              />

              <small>
                {review.length}/800
              </small>
            </label>

            <button
              type="submit"
              className="review-form__submit"
              disabled={submitting}
            >
              {submitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Review
                  <Send size={17} />
                </>
              )}
            </button>

            {message.text && (
              <div
                className={`review-form__status review-form__status--${message.type}`}
              >
                {message.type ===
                "success" ? (
                  <CheckCircle2
                    size={18}
                  />
                ) : (
                  <AlertCircle
                    size={18}
                  />
                )}

                <span>
                  {message.text}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}