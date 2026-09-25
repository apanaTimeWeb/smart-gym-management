// RESPONSIBILITY: Validates API currency fields against the runtime ISO-4217 currency catalog without adding a third-party dependency.
// FLOW: DTO -> @AdminCoreIsISO4217CurrencyCode() -> class-validator -> API validation boundary.
import { registerDecorator, ValidationOptions } from 'class-validator';

const FALLBACK_ISO_4217 = new Set([
  'AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD','BTN','BWP','BYN','BZD','CAD','CDF','CHF','CLP','CNY','COP','CRC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HTG','HUF','IDR','ILS','INR','IQD','IRR','ISK','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRU','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLE','SLL','SOS','SRD','SSP','STN','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VED','VES','VND','VUV','WST','XAF','XCD','XOF','XPF','YER','ZAR','ZMW','ZWL'
]);

function supportedCurrencyCodes(): Set<string> {
  const intl = Intl as typeof Intl & { supportedValuesOf?: (key: 'currency') => string[] };
  const values = intl.supportedValuesOf?.('currency');
  return new Set(values && values.length ? values : [...FALLBACK_ISO_4217]);
}

export function AdminCoreIsISO4217CurrencyCode(validationOptions?: ValidationOptions): PropertyDecorator {
  const codes = supportedCurrencyCodes();
  return (target: object, propertyKey: string | symbol) => {
    registerDecorator({
      name: 'AdminCoreIsISO4217CurrencyCode',
      target: target.constructor,
      propertyName: String(propertyKey),
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean { return typeof value === 'string' && codes.has(value.toUpperCase()); },
        defaultMessage(): string { return 'currency must be a valid ISO 4217 currency code'; },
      },
    });
  };
}
