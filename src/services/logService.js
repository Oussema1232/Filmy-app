// import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://f7340017b405449da407cd0c8867a857@o383746.ingest.sentry.io/5214109",
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error.message);
}

export default {
  init,
  log,
};
