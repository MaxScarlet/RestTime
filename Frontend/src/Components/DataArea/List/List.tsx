import "./List.css";

function List(): JSX.Element {
  const [audience, setAudience] = useState<AudienceModel[]>([]);
  const [gifts, setGifts] = useState<GiftModel[]>([]);
  useEffect(() => {
    dataService
      .getAllAudience()
      .then((dbAudience) => setAudience(dbAudience))
      .catch((err) => notifyService.error);
  }, []);

  async function showGifts(args: ChangeEvent<HTMLSelectElement>) {
    try {
      const audienceId = +args.target.value;
      const dbGifts = await dataService.getGiftsByAudience(audienceId);
      setGifts(dbGifts);
    } catch (err) {
      notifyService.error(err);
    }
  }
  async function deleteGift(giftId: number) {
    try {
      const sure = window.confirm(
        `Are you sure you want to delete gift number ${giftId}`
      );
      if (!sure) return;
      await dataService.deleteGift(giftId);
      setGifts(gifts.filter((g) => g.giftId !== giftId));
      notifyService.success("Gift deleted successfully");
    } catch (err) {
      notifyService.error(err);
    }
  }
  return (
    <div className="List">
      <label>Select Audience: </label>
      <select defaultValue="" onChange={showGifts}>
        <option disabled value="">
          Select
        </option>
        {audience.map((a) => (
          <option key={a.audienceId} value={a.audienceId}>
            {a.audienceName}
          </option>
        ))}
      </select>
      <br />
      {gifts.map((gift) => (
        <Card key={gift.giftId} gift={gift} deleteMe={deleteGift} />
      ))}
    </div>
  );
}

export default List;
