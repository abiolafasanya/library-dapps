export function convertIpfsUrl(ipfsUrl: string): string {
  return ipfsUrl.replace("ipfs://", "https://ipfs.io/");
}

export function limitTextLength(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

enum LOCALE {
  NG = "en-NG",
  US = "en-US",
}

export function formatDateWithNoTime(date: string) {
  const parsedDate = Date.parse(date);
  if (isNaN(parsedDate)) {
    return "Invalid Date";
  }

  const formattedDate = new Intl.DateTimeFormat(LOCALE.US, {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: 'numeric',
    // minute: 'numeric',
    // hour12: true,
  }).format(parsedDate);

  return formattedDate;
}
