"use client";

import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  useEffect(() => {
    if (isOpen) {
      if (isConnected) {
        if (openAccountModal) {
          openAccountModal();
        }
      } else {
        if (openConnectModal) {
          openConnectModal();
        }
      }
      onClose();
    }
  }, [isOpen, isConnected, openConnectModal, openAccountModal, onClose]);

  return null;
};

export default WalletConnectModal;
