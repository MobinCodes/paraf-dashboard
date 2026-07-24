import { ImageResponse } from 'next/og';

export const size = {
    width: 180,
    height: 180,
};

export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)',
                }}
            >
                <div
                    style={{
                        width: 144,
                        height: 144,
                        borderRadius: 40,
                        background: 'linear-gradient(135deg, #7C49F2 0%, #19A7E5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 18px 40px rgba(124, 73, 242, 0.25)',
                    }}
                >
                    <div
                        style={{
                            width: 92,
                            height: 92,
                            borderRadius: 30,
                            background: 'rgba(255,255,255,0.96)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#7C49F2',
                            fontSize: 56,
                            fontWeight: 900,
                            fontFamily: 'Arial, sans-serif',
                            lineHeight: 1,
                        }}
                    >
                        P
                    </div>
                </div>
            </div>
        ),
        size
    );
}
