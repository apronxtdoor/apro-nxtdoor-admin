<>
  <form action="/api/select-role" method="post" className="space-x-3">
    <input type="hidden" name="role" value="USER" />
    <button type="submit" className="btn">
      I’m a user
    </button>
  </form>

  <form action="/api/select-role" method="post" className="space-x-3">
    <input type="hidden" name="role" value="VENDOR" />
    <button type="submit" className="btn">
      I’m a vendor
    </button>
  </form>
</>;
