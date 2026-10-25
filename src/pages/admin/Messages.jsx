import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import LedgerTable from '../../components/admin/LedgerTable';
import Modal from '../../components/admin/Modal';
import Notice from '../../components/admin/Notice';
import PageHeader from '../../components/admin/PageHeader';
import ResetPasswordDialog from '../../components/admin/ResetPasswordDialog';
import Pager from '../../components/admin/Pager';
import StatusDot from '../../components/admin/StatusDot';
import usePaging from '../../components/admin/usePaging';
import { formatDate, useLibrary } from '../../context/LibraryContext';

const PAGE_SIZE = 10;

// Messages sent from the public Contact form.
export default function Messages() {
  const { messages, unreadMessages, setMessageRead, deleteMessage, getStudent, getStaff, me } = useLibrary();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [resetting, setResetting] = useState(null);
  const [notice, setNotice] = useState('');

  const filters = [
    ['all', 'All', messages.length],
    ['unread', 'Unread', unreadMessages],
    ['read', 'Read', messages.length - unreadMessages],
    ['reset', 'Reset requests', messages.filter((m) => m.kind === 'reset').length],
  ];

  const needle = query.trim().toLowerCase();
  const filtered = messages.filter(
    (m) =>
      (filter === 'all' ||
        (filter === 'unread' ? !m.read : filter === 'reset' ? m.kind === 'reset' : m.read)) &&
      (!needle || [m.name, m.email, m.subject, m.message].some((t) => t.toLowerCase().includes(needle))),
  );
  const paging = usePaging(filtered, PAGE_SIZE, `${needle}|${filter}`);

  const opened = messages.find((m) => m.id === openId);
  const account =
    opened?.kind === 'reset' && opened.accountId
      ? (opened.role === 'student' ? getStudent : getStaff)(opened.accountId)
      : null;

  function open(message) {
    setOpenId(message.id);
    if (!message.read) setMessageRead(message.id, true);
  }

  const columns = [
    {
      key: 'from',
      label: 'From',
      title: true,
      render: (m) => (
        <>
          <strong>{m.name}</strong>
          <small>{m.email}</small>
        </>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (m) => (
        <>
          {m.read ? m.subject : <strong>{m.subject}</strong>}
          {m.kind === 'reset' && (
            <>
              {' '}
              <StatusDot tone="warn">Password reset</StatusDot>
            </>
          )}
        </>
      ),
    },
    { key: 'on', label: 'Received', render: (m) => formatDate(m.on) },
    {
      key: 'status',
      label: 'Status',
      render: (m) => (m.read ? <StatusDot tone="neutral">Read</StatusDot> : <StatusDot tone="warn">Unread</StatusDot>),
    },
    {
      key: 'actions',
      label: 'Actions',
      actions: true,
      render: (m) => (
        <>
          <button type="button" className="btn btn-sm" aria-label={`Open message from ${m.name}`} onClick={() => open(m)}>
            Open
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            aria-label={`Delete message from ${m.name}`}
            onClick={() => setDeleting(m)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <title>Inbox | BookVerse Admin</title>
      <meta name="description" content="Messages sent from the contact form." />
      <main className="ad-main">
        <PageHeader
          title="Inbox"
          meta={
            <>
              <span className="mono">{messages.length}</span> messages ·{' '}
              <span className="mono">{unreadMessages}</span> unread
            </>
          }
        />

        {notice && <Notice onClose={() => setNotice('')}>{notice}</Notice>}

        <div className="ad-toolbar">
          <input
            type="search"
            className="ad-input"
            placeholder="Search name, email or text"
            aria-label="Search messages"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="ad-tabs">
            {filters.map(([value, label, count]) => (
              <button
                type="button"
                key={value}
                className={`ad-tab${filter === value ? ' on' : ''}`}
                onClick={() => setFilter(value)}
              >
                {label}
                <span className="mono">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <LedgerTable
          columns={columns}
          rows={paging.rows}
          rowKey={(m) => m.id}
          empty={
            messages.length === 0 ? (
              <>
                <strong>No messages yet.</strong>
                Messages sent from the Contact page will appear here.
              </>
            ) : (
              <>
                <strong>No messages match.</strong>
                Try a different search or filter.
              </>
            )
          }
        />
        <Pager {...paging} onPage={paging.setPage} />
      </main>

      {opened && !deleting && !resetting && (
        <Modal
          title={opened.subject}
          onCancel={() => setOpenId(null)}
          footer={
            <>
              <button type="button" className="btn" onClick={() => setOpenId(null)}>
                Close
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setMessageRead(opened.id, false);
                  setOpenId(null);
                }}
              >
                Mark unread
              </button>
              <a
                className="btn btn-primary"
                href={`mailto:${opened.email}?subject=${encodeURIComponent(`Re: ${opened.subject}`)}`}
              >
                Reply
              </a>
            </>
          }
        >
          <p className="muted">
            From {opened.name} &lt;{opened.email}&gt; · {formatDate(opened.on)}
          </p>
          <p className="message-text">{opened.message}</p>
          {opened.kind === 'reset' && (
            <div className="ad-preview">
              {account ? (
                <>
                  <strong>{account.name}</strong> · {account.id} · {opened.role}
                  {opened.role === 'student' && (
                    <>
                      {' '}
                      · <Link to={`/admin/members/${account.id}`}>View member</Link>
                    </>
                  )}
                  <div style={{ marginTop: 10 }}>
                    {account.id === me?.id ? (
                      <span>This is your own account. Change your password from Profile.</span>
                    ) : (
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => setResetting(account)}>
                        Reset password
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <span>No {opened.role} account matches this email.</span>
              )}
            </div>
          )}
        </Modal>
      )}

      {resetting && (
        <ResetPasswordDialog
          person={resetting}
          onCancel={() => setResetting(null)}
          onDone={(text) => {
            setNotice(text);
            setResetting(null);
            setOpenId(null);
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this message?"
          confirmLabel="Delete"
          danger
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            await deleteMessage(deleting.id);
            setNotice(`Deleted the message from ${deleting.name}.`);
            setDeleting(null);
            setOpenId(null);
          }}
        >
          <p>“{deleting.subject}” from {deleting.name} is removed for good.</p>
        </ConfirmDialog>
      )}
    </>
  );
}
