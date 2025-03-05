import Image from "next/image";
import React, { useState } from "react";
import PowerBeats3 from "@/public/assets/powerbeats3.png";
import HavitSpeakers from "@/public/assets/havit-speakers.png";

const TreasureHunt = () => {
  const [isModal, setIsModal] = useState(false);
  const [rotateWheel, setRotateWheel] = useState(false);

  const handleSpin = () => {
    console.log("hello");
    let x = 1024;
    let y = 9999;

    let deg = Math.floor(Math.random() * (x - y)) + y;

    document.getElementById("box").style.transform = "rotate(" + deg + "deg)";

    const element = document.getElementById("mainbox");
    element.classList.remove("animate");
    setTimeout(function () {
      element.classList.add("animate");
    }, 5000);
  };

  return (
    <>
      <button
        onClick={() => setIsModal(true)}
        className="animation bg-black text-white text-xs flex items-center gap-2 rounded-lg px-4 py-3 hover:opacity-80"
      >
        Treasure Hunt
      </button>

      {isModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
          <div>
            <h1 className="text-white text-3xl">Treasure Hunt</h1>
            <div id="mainbox" className="mainbox">
              <div id="box" className="box rotate-90">
                <div className="box1">
                  <div className="span span1">
                    <b>
                      <Image
                        src={PowerBeats3}
                        className="size-16"
                        alt="Power beats 3"
                      />
                    </b>
                  </div>
                  <span className="span span2">
                    <b>
                    <Image
                        src={HavitSpeakers}
                        className="size-16"
                        alt="Power beats 3"
                      />
                    </b>
                  </span>
                  <span className="span span3">
                    <b>250</b>
                  </span>
                  <span className="span span4">
                    <b>350</b>
                  </span>
                </div>
                <div className="box2">
                  <span className="span span1">
                    <b>10</b>
                  </span>
                  <span className="span span2">
                    <b>110</b>
                  </span>
                  <span className="span span3">
                    <b>210</b>
                  </span>
                  <span className="span span4">
                    <b>310</b>
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleSpin();
                }}
                className="spin active:h-[70px] active:w-[70px] active:text-[20px]"
              >
                SPIN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TreasureHunt;
