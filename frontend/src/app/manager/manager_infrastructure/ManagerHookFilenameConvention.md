# Manager Hook Filename Convention

Manager hook files intentionally use the module-prefixed filename form, such as `ManagerUseManagerAttendanceQueries.ts`, because the global Rule 3 module-prefix requirement applies to every non-framework filename.

The `use*.ts` wording in the extended hook-size rule identifies hook files by responsibility/type; it does not override the mandatory Manager filename prefix. Exported hook callables retain the semantic `use...` name.
