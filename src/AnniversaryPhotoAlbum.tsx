
import React from 'react';

const photos = [
    {
        "id": 1,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJspmVhm21vg6fvWe3YvZe7kHLo4RqOix2Dc-262u17nBynNWdrZA4YVAnAEwYVnT6oIicmiLHDJt4wdl5L7WOijdRf6ObEwDOXwPVRIye7fNwGO6rdAapaDZRe_848LpCChsGuFvdM2EszByZCx7SOxArUNrfwFfVWiCMeSNz6uDvJR2vwR1a4dD03so7dzjF9R-ZtvLxYSHac1KGZ-qse8dj-UNlZuh6g-W_G2AgF4tgA4jgjg0H0z0JUhPXFvQihqOCXQjP5M",
        "title": "Our first date",
        "caption": "I was so nervous, but you were so easy to talk to. Best coffee of my life."
    },
    {
        "id": 2,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7c7q4AiSLo_SebkasXqzUiSYa2G8UmG9itXvqmQj7Fbun0EQVotE3X1kKQxnYnKekGWzvl2Ts8glXWxdIBO7UghxXHB77rvW9p5ikOwY0OSw9OCNmBRbWl51HMQ27VsHipmWOzKmjiBawDLtv1jfD6R2FyHzifaCLIl-af58rWaln-fPS6uBXpixvRxpipn4j8vzKJ_ecvWouljHNmvh1JCwCS10QyFHnoTn5ThJUBOW9EFTFQNuO1HCAkNlT_kt2jDPN7Yo-iE",
        "title": "Our first trip",
        "caption": "Remember getting lost in the mountains? That was an adventure!"
    },
    {
        "id": 3,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuB0wP63rFkjB_thSpxO4MC9Rhj-zAJoZxhz3PTg7A5R5FBpv1OakEIRTVGrD5M0npD_m70PK650luuP2psq2pxvwk60gJP8873jx8UEugVvOK25nzAUf1Gn44Jfzu0ygUav9zOXIpSsfA4EuqFRgWI1Byjg7_3ShPe1edaGvHWxE3pxRmv4_CkY35sluBtvSWd-AGDmI0qOSL9z4XPYnhoPYB7xvAPr0FhgsLQ8EAQn8dMLCvsrxOjAIx-paGFhQp6MmLjqKPfnhvU",
        "title": "Our first Christmas",
        "caption": "Building that gingerbread house was a sticky but sweet memory."
    },
    {
        "id": 4,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuD1vz6ZRTO4VSJlSGNXPJUQnvB25Cc9yyI10OshwUsn9f26FxMoGAnQdwlhAKQpe4Fcokvff7rLaOuMLWveGBGG4IO7O1J9USD06GrUr3LmJGHFmfPuGChB8e_ik-opuicbwZEsKDuvvhrT6YFfjPzSPbWIEaYCNZEVruWakCm7Np_ss3rAiFm6MHUR5Fkglou7vyQVZCYyGgtu4Z0L6LxWrak6Xj3FocSPayvYMYuWlPz2L_R4O8jOUGfLmv7BUZbTHYqXVKPuFDw",
        "title": "Our first anniversary",
        "caption": "That picnic by the lake was perfect. Can't believe it's been a year."
    },
    {
        "id": 5,
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuDeG5hcd6gREdkFmqwZvZykMYWwXcl8yRBQyieDKRAATTMuv7Hj1tOjlqAPuNC8a7_4dxbvYy-LRY6t50Z2m_WDNsYe9RsuAXkOqUegCvqD1XySiwzCGaHjbfT9Bb-6mwhhb7fPtJZSeKWFTakf_Z_TxN2fEr_0lydh4-3CNYfxvuQw3c_4GM9Bv454awStVdTpgNy2QOtWpCIBxqeNnSXGPIqiJ_AqSRVOTH18vI2SqmVmZSj9Cs6Zcxtwm74CybQIfQ8zHZkhrE4",
        "title": "Our second anniversary",
        "caption": "Two years down, forever to go. I love you more every day."
    }
];

const AnniversaryPhotoAlbum: React.FC = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="w-10"></div>
          <h1 className="text-lg font-bold text-center flex-1">Our Story</h1>
          <button className="w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-content-light dark:text-content-dark">
              add_circle
            </span>
          </button>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto pb-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="flex-shrink-0 w-[85vw] snap-center">
              <div className="relative bg-white dark:bg-subtle-dark/50 rounded-lg shadow-md flex flex-col justify-end overflow-hidden aspect-[9/16] p-4">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${photo.imageUrl}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="relative text-white z-10">
                  <p className="text-xl font-bold">{photo.title}</p>
                  <p className="text-sm mt-1">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-subtle-light dark:border-subtle-dark">
        <nav className="flex justify-around items-center px-4 pt-2 pb-5">
          <a className="flex flex-col items-center gap-1 text-primary" href="#">
            <span className="material-symbols-outlined">photo_library</span>
            <span className="text-xs font-medium">Photos</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-content-light/60 dark:text-content-dark/60" href="#">
            <span className="material-symbols-outlined">favorite</span>
            <span className="text-xs font-medium">Memories</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-content-light/60 dark:text-content-dark/60" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-xs font-medium">Settings</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default AnniversaryPhotoAlbum;
