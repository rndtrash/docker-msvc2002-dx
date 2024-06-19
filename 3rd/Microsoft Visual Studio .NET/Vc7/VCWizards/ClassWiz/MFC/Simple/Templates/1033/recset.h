#pragma once



// [!output CLASS_NAME] recordset

class [!output CLASS_NAME] : public CRecordset
{
public:
	[!output CLASS_NAME](CDatabase* pDatabase = NULL);
	DECLARE_DYNAMIC([!output CLASS_NAME])

// Field/Param Data

// Overrides
	public:
	virtual CString GetDefaultConnect();    // Default connection string
	virtual CString GetDefaultSQL();    // Default SQL for Recordset
	virtual void DoFieldExchange(CFieldExchange* pFX);  // RFX support

// Implementation
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif
};
