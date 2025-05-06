import React, { useState } from 'react';
import {Tooltip, ClickAwayListener} from '@mui/material';
import Image from 'next/image';
import IC_Info from "@/assets/images/icons/infomation/btn_sm_help_n.png";
import IC_Close from "@/assets/images/icons/ic_tooltip_close.png";

export default function InfoTooltip({ title }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (e) => {
    e.stopPropagation(); // 셀렉트 열림 방지
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div className="custom-tooltip-wrapper">
        <Tooltip
          placement="right"
          PopperProps={{
            className: 'custom-tooltip',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0,0],
                },
              },
            ],
          }}
          arrow
          open={open}
          onClose={handleTooltipClose}
          title={
            <div className="tooltip-content">
              <span>{title}</span>
              <Image className="close-button" src={IC_Close} alt="Close Icon" height={16} width={16} onClick={handleTooltipClose}/>
            </div>
          }
        >
          <Image className="icons" src={IC_Info} alt="info Icon" height={20} width={20} onClick={handleTooltipOpen}/>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}