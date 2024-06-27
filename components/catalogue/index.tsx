import { Catalogmodel } from '@/app/app/page';
import { doit } from '@/classes';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef } from 'react';

doit();

const Catalogue = ({ content }: { content: Catalogmodel }) => {
	return (
		<>
			<h2>
				{content.page} of {content.pages}
			</h2>
			<div className='catalogue__content__items'>
				{content.list.map((card, i) => (
					<Link href={'/app/' + card.id} className={'catalogue-card'}>
						<div key={i}>
							<div>model: {card.model}</div>(
							<div>
								{`tariff:`}{' '}
								{card.tarif.length
									? card.tarif.map((tarif, i) => (
											<span>
												{i + 1}
												{') '}
												{'"'}
												{tarif}
												{'"'}{' '}
											</span>
										))
									: 'not set'}
							</div>
							)
							<div>
								<Suspense fallback={<div>loading...</div>}>
									<img /* width={200} height={200} */ alt='alt data' src={card.image} />
								</Suspense>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default Catalogue;
