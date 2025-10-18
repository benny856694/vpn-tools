// vless://xxxxxx@g.mumi.uk:25806/?type=tcp&security=reality&sni=xxx&pbk=xxxxxx&flow=xtls-rprx-vision&sid=xxxx&fp=chrome#planb-1
//parse the above URL and return the following components: host name, name (after #)
export function parseVlessUrl(url: string) {
  const urlObj = new URL(url);
  const hostName = urlObj.hostname;
  const name = urlObj.hash ? urlObj.hash.substring(1) : '';
  return { hostName, name };
}

//split a string by 'vless://' and returen the splitted parts, but keep the 'vless://' prefix in each part
export function splitVlessString(input: string): string[] {
    // split while keeping the "vless://" prefix in each piece
    return input
        .split(/(?=vless:\/\/)/i)
        .map(part => part.trim())
        .filter(part => part !== '');
}

//replace the name in the vless URL
export function replaceVlessName(url: string, newName: string) {
  const urlObj = new URL(url);
  urlObj.hash = `#${newName}`;
  return urlObj.toString();
}

//get the geolocation from the vless URL host name by calling http://ip-api.com/json/{g.mumi.uk}?fields=countryCode
//return format: { countryCode: 'US' }
export async function getGeolocationFromVlessUrl(url: string) {
  const { hostName } = parseVlessUrl(url);
  const response = await fetch(`http://ip-api.com/json/${hostName}?fields=countryCode`);
  if (!response.ok) {
    throw new Error('Failed to fetch geolocation data');
  }
  const data = await response.json();
  return data.countryCode;
}


//parse the vless urls and append the geolocation country code to the name
export async function appendGeolocationToVlessNames(input: string): Promise<string> {
  const vlessUrls = splitVlessString(input);
  const updatedUrls = await Promise.all(vlessUrls.map(async (url) => {
    const { name } = parseVlessUrl(url);
    try {
      const countryCode = await getGeolocationFromVlessUrl(url);
      const newName = name ? `${name}(${countryCode})` : `${countryCode}`;
      return replaceVlessName(url, newName);
    } catch (error) {
      console.error(`Error fetching geolocation for URL: ${url}`, error);
      return url; // return original URL if there's an error
    }
  }));
  return updatedUrls.join('\n');
}