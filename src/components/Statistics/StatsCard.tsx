import { ReactElement } from "react";
import { ProfileInfo } from "../../state/profile";
import "./Statistics.scss";
import { JobInfo } from "../../state/jobs";

interface StatsCardProps {
  profile: ProfileInfo;
  stats?: Map<string, number>;
  total: number;
  ratio: number;
  jobInfos: JobInfo[];
}

function StatsCard(props: StatsCardProps) {
  const getStatsLines = (): ReactElement[] => {
    const lines: ReactElement[] = [];

    if (props.stats) {
      new Map([...props.stats.entries()]
        .sort((a, b) => a[0].localeCompare(b[0])))
        .forEach((value, key) => {
          const jobInfo = props.jobInfos.find(info => info.id === key);

          if (jobInfo) {
            lines.push(
              <p>{jobInfo.name}: {value}</p>
            )
          }
        });
    } else {
      lines.push(
        <p>No jobs to show...</p>
      )
    }

    return lines;
  }

  const getRatioClass = (): string => {
    if (props.ratio < 0.55) {
      return "green";
    } else if (props.ratio >= 0.55 && props.ratio <= 0.65) {
      return "yellow";
    }
    return "red"
  }

  return (
    <div className="StatsCard ui card external">
      <div className="content">
        <div className="header">
          <p>{props.profile.name}</p>
          <p>{props.total} (<span className={getRatioClass()}>{(props.ratio * 100).toFixed(0)}%</span>)</p>
        </div>
        <div className="StatsContainer">
          {getStatsLines()}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;