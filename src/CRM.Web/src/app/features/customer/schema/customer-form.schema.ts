import type { CustomerAddRequestDto } from '@api/model';
import { z } from 'zod';

const requiredString = (message: string) => z.string().trim().min(1, message);

const emptyToUndefined = (value: string): string | undefined => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const contactFormSchema = z.object({
  name: requiredString('Name is required.'),
  email: z.email('Enter a valid email.'),
  phone: requiredString('Phone is required.'),
  position: z.string(),
  department: z.string(),
  notes: z.string(),
});

export const addressFormSchema = z.object({
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

export const customerFormSchema = z.object({
  name: requiredString('Name is required.'),
  code: requiredString('Code is required.'),
  type: z.number(),
  status: z.number(),
  source: z.string(),
  companyId: z.string().nullable(),
  contacts: z.array(contactFormSchema),
  addresses: z.array(addressFormSchema),
});

export type CustomerFormValue = z.input<typeof customerFormSchema>;
export type ContactFormValue = z.input<typeof contactFormSchema>;
export type AddressFormValue = z.input<typeof addressFormSchema>;

export const customerRequestSchema = customerFormSchema.transform(
  (model): CustomerAddRequestDto => {
    const source = model.source.trim();
    const contacts = model.contacts.map((contact) => ({
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      position: contact.position.trim(),
      department: contact.department.trim(),
      notes: contact.notes.trim(),
    }));
    const addresses = model.addresses.map((address) => ({
      addressLine1: emptyToUndefined(address.addressLine1),
      addressLine2: emptyToUndefined(address.addressLine2),
      city: emptyToUndefined(address.city),
      state: emptyToUndefined(address.state),
      zip: emptyToUndefined(address.zip),
      country: emptyToUndefined(address.country),
    }));

    return {
      name: model.name.trim(),
      code: model.code.trim(),
      type: model.type,
      status: model.status,
      source: source.length > 0 ? source : null,
      companyId: model.companyId || null,
      ...(contacts.length > 0 ? { contacts } : {}),
      ...(addresses.length > 0 ? { addresses } : {}),
    };
  },
);
