import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import IC_Home from "@/assets/images/icons/ic_breadcrumb_home.png";
import IC_Depth from "@/assets/images/icons/ic_breadcrumb_depth.png";
import IC_Acc_n from "@/assets/images/icons/btn_md_account_n.png";
import IC_Acc_h from "@/assets/images/icons/btn_md_account_p.png";
import IC_Help_n from "@/assets/images/icons/btn_md_help_n.png";
import IC_Help_h from "@/assets/images/icons/btn_md_help_p.png";

function IconButton({ normalSrc, hoverSrc, altText, width, height }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ cursor: 'pointer', display: 'inline-block', marginRight: '10px' }}
    >
      <Image
        src={isHovering ? hoverSrc : normalSrc}
        alt={altText}
        width={width}
        height={height}
      />
    </div>
  );
}

const Header = () => {
  const router = useRouter();
  const [pathSegments, setPathSegments] = useState([]);

  useEffect(() => {
    const segments = router.pathname.split('/').filter(segment => segment !== '');
    setPathSegments(segments);
  }, [router.pathname]);

  return (
    <header style={{ width:"100%", backgroundColor: '#2F332E', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/">
          <div style={{ marginRight: '10px', cursor: 'pointer' }}>
            <Image src={IC_Home} alt="Home Icon" height={20} width={20} /> {/* Adjust height and width as needed */}
          </div>
        </Link>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <>
                <div style={{ margin: '0 10px' }}>
                  <Image src={IC_Depth} alt="Depth Icon" height={20} width={20} /> {/* Adjust height and width as needed */}
                </div>
                <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                  <div style={{ cursor: 'pointer', color:"#FFFFFF"}}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </div>
                </Link>
              </>
            )}
            {index === 0 && pathSegments.length > 0 && (
              <>
                <div style={{ margin: '0 10px' }}>
                  <Image src={IC_Depth} alt="Depth Icon" height={20} width={20} /> {/* Adjust height and width as needed */}
                </div>
                <Link href={`/${segment}`}>
                  <div style={{ cursor: 'pointer', color:"#999999" }}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </div>
                </Link>
              </>
            )}
          </React.Fragment>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          normalSrc={IC_Acc_n}
          hoverSrc={IC_Acc_h}
          altText="AccIcon"
          width={20}
          height={20}
        />
        <IconButton
          normalSrc={IC_Help_n}
          hoverSrc={IC_Help_h}
          altText="HelpIcon"
          width={20}
          height={20}
        />
      </div>
    </header>
  );
};

export default Header;