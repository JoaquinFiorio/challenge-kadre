import { StatCard } from "../components";
import { Padding } from "../../core/components";
import { BellIcon, TrendingUpIcon } from "../../../icons";
import { useTransport } from "../../transaction/hooks";
import { useEffect, useState } from "react";

export const Home = () => {

  const [isMounted, setIsMounted] = useState(false);

  const { gallons, transportsCount, loadGallonsCount, loadTransportsCount } = useTransport();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      loadGallonsCount();
      loadTransportsCount();
    }
  }, [isMounted]);

  return (
    <Padding>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title={'Total galones transportados'}
          value={
            gallons.toString()
          }
          icon={<BellIcon />}
        />
        <StatCard
          title={'Total transportes creados'}
          value={
            transportsCount.toString()
          }
          icon={<TrendingUpIcon />}
        />
      </div>
    </Padding>
  );
}