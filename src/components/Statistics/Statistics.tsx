import dayjs, { Dayjs } from "dayjs";
import { ReactElement, useEffect, useState } from "react";
import { ProfileInfo } from "../../state/profile";
import Header from "../Common/Header";
import "./Statistics.scss";
import { DatabaseTable, getItems, onItemsSnapshot } from "../../utils/firestore";
import { Job, JobInfo } from "../../state/jobs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StatsCard from "./StatsCard";

type statistics = Map<string, Map<string, number>>;

function Statistics() {
  const [roster, setRoster] = useState([] as ProfileInfo[]);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState<Dayjs>(dayjs().subtract(13, 'days'));
  const [end, setEnd] = useState<Dayjs>(dayjs());
  const [dateError, setDateError] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<statistics>();
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      setRoster(await getItems<ProfileInfo>(DatabaseTable.PROFILES));
      onItemsSnapshot(DatabaseTable.PROFILES, (profiles: ProfileInfo[]) => setRoster(profiles));

      setJobs(await getItems<Job>(DatabaseTable.JOBS));
      onItemsSnapshot(DatabaseTable.JOBS, (jobs: Job[]) => setJobs(jobs));

      setJobInfos(await getItems<JobInfo>(DatabaseTable.JOB_INFO));

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const getStats = (): statistics => {
      return jobs.reduce((memberMap: statistics, job) => {
        const isAfterStart = job.createdAt && new Date(job.createdAt).getTime() >= start.toDate().getTime();
        const isBeforeEnd = job.createdAt && new Date(job.createdAt).getTime() <= end.toDate().getTime();

        if (!job.completed || !isAfterStart || !isBeforeEnd) {
          return memberMap;
        }

        const crew = [
          ...new Set(
            Object.values(job.crew).reduce((crew, members) => [...crew, ...members], [])
          )
        ].filter(member => member);

        crew.forEach(member => {
          if (memberMap.has(member)) {
            memberMap.get(member)?.set(job.job, (memberMap.get(member)?.get(job.job) ?? 0) + 1);
          } else {
            memberMap.set(member, new Map<string, number>([[job.job, 1]]))
          }
        });

        return memberMap;
      }, new Map());
    }

    setStats(getStats());
  }, [roster, jobs, start, end])

  const handleUpdateStart = (start: Dayjs) => {
    setDateError(false);
    setStart(start);

    if (!start.isBefore(end)) {
      setDateError(true);
    }
  }

  const handleUpdateEnd = (end: Dayjs) => {
    setDateError(false);
    setEnd(end);

    if (!start.isBefore(end)) {
      setDateError(true);
    }
  }

  const getStatsCards = (): ReactElement[] => {
    const profileData = roster.map(profile => {
      const profileStats = stats?.get(profile.id)
      return {
        profile,
        stats: profileStats,
        total: getStatsTotal(profileStats),
      }
    });

    return profileData
      .sort((a, b) => b.total - a.total)
      .map(data => (
        <StatsCard
          profile={data.profile}
          stats={data.stats}
          total={data.total}
          jobInfos={jobInfos}
        />
      ));
  }

  const getStatsTotal = (stats?: Map<string, number>): number => {
    let sum = 0;
    if (stats) {
      stats.forEach(value => {
        sum += value;
      });
    }
    return sum;
  }

  return (
    <div className="Statistics">
      <Header text="Statistics" decorated />
      <div className='Actions'>
        <div className='Filters'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start"
              value={start}
              disabled={loading}
              onChange={value => handleUpdateStart(dayjs(value))}
            />
            <DatePicker
              label="End"
              value={end}
              disabled={loading}
              onChange={value => handleUpdateEnd(dayjs(value))}
            />
          </LocalizationProvider>
        </div>
      </div>
      {dateError && <p className='error'>The start date must be before the end date.</p>}
      {!dateError && stats && (
        <div className='content'>
          {getStatsCards()}
        </div>
      )}
    </div>
  );
}

export default Statistics;