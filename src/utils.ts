export const transformMovieDetails = (details, credits, keywords, recommendations) => {
  const cast = credits.cast.map((item) => {
    return {
      picture: item.profile_path,
      name: item.name,
      character: item.character,
    };
  });

  const viewedDirectors = {};
  const viewedWriters = {};
  const directors = credits.crew
    .filter((item) => item.known_for_department === "Directing")
    .map((item) => {
      if (viewedDirectors[item.id])
        return;
      viewedDirectors[item.id] = true;
      return item;
    })
    .filter(_ => _);
  const screenwriters = credits.crew
    .filter((item) => item.known_for_department === "Writing")
    .map((item) => {
      if (viewedWriters[item.id])
        return;
      viewedWriters[item.id] = true;
      return item;
    })
    .filter(_ => _);

  return {
    ...details,
    cast,
    directors,
    screenwriters,
    keywords: keywords.keywords.map((it) => it.name),
    recommendations: recommendations.results.map((it) => {
      return {
        id: it.id,
        imgURL: it.backdrop_path,
        title: it.title,
        rating: it.vote_average * 10,
      }
    })
  };
};
