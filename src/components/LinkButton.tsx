/*
    Just a <Link> wrapper button.
*/

import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
};

export const LinkButton = (props: LinkButtonProps) => {
  const {href, children} = props;

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
};
